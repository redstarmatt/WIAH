'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface SelfEmploymentData {
  national: {
    selfEmployedCount: {
      timeSeries: Array<{ year: number; millionsSelfEmployed: number }>;
    };
    medianIncome: {
      timeSeries: Array<{ year: number; weeklyMedian: number }>;
    };
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SelfEmploymentPage() {
  const [data, setData] = useState<SelfEmploymentData | null>(null);

  useEffect(() => {
    fetch('/data/self-employment/self_employment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const countSeries: Series[] = data
    ? [{
        id: 'self-employed-count',
        label: 'Self-employed (millions)',
        colour: '#F4A261',
        data: data.national.selfEmployedCount.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.millionsSelfEmployed,
        })),
      }]
    : [];

  const incomeSeries: Series[] = data
    ? [{
        id: 'median-income',
        label: 'Median weekly income (£)',
        colour: '#264653',
        data: data.national.medianIncome.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.weeklyMedian,
        })),
      }]
    : [];

  const countAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: '2020: 700K leave self-employment' },
    { date: yearToDate(2021), label: '2021: IR35 reforms' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Self-Employment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Self-Employment"
          question="What Happened to Britain&apos;s Self-Employed?"
          finding="Self-employment peaked at 4.93 million in 2019 then collapsed: 700,000 people left the sector during COVID-19 and have not returned. The self-employed earn 40&percnt; less per hour than employees on a median basis, have no entitlement to sick pay, holiday pay, or employer pension contributions, and were excluded from furlough. IR35 reforms have pushed many into a grey zone between employment and self-employment."
          colour="#F4A261"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK&apos;s self-employed workforce peaked at 4.93 million in late 2019, representing approximately 15&percnt; of total employment and making the UK one of the most self-employed economies in the OECD. The sector then experienced a collapse without modern precedent: approximately 700,000 people left self-employment during the COVID-19 pandemic and, by 2024, the total had recovered to only 4.29 million &mdash; still 13&percnt; below the pre-pandemic peak. This is not a temporary dip but a structural shift. ONS analysis suggests that most of those who left moved into employee roles (attracted by the security of PAYE employment), retired, or became economically inactive. The Self-Employment Income Support Scheme (SEISS) provided emergency grants to 2.7 million self-employed individuals during the pandemic, but excluded the newly self-employed (less than one year of trading), those with trading profits above &pound;50,000, and those who had not filed a 2018/19 Self Assessment return &mdash; leaving approximately 1.4 million self-employed people with no income support.</p>
            <p>The economics of self-employment have deteriorated. Median weekly earnings for the self-employed are approximately &pound;310, compared with &pound;535 for employees &mdash; a gap of 42&percnt;. One in three self-employed workers earns below the National Living Wage on an hourly basis. Income volatility is extreme: IPSE research shows that 45&percnt; of freelancers experienced month-to-month income swings of more than 50&percnt; in 2023. The self-employed have no statutory right to sick pay, holiday pay, maternity/paternity pay, or redundancy pay. Auto-enrolment into workplace pensions does not apply, meaning only 16&percnt; of the self-employed contribute to a pension, compared with 79&percnt; of employees. HMRC data shows that 40&percnt; of Self Assessment tax returns declare income below &pound;12,570 (the personal allowance), meaning a substantial proportion of the self-employed earn so little that they owe no income tax. The Resolution Foundation has described self-employment as an &ldquo;incomes crisis hiding in plain sight.&rdquo;</p>
            <p>IR35 &mdash; the tax rules designed to prevent &ldquo;disguised employment&rdquo; through personal service companies &mdash; is the most contentious policy issue in the sector. The off-payroll working rules, extended to the private sector in April 2021, shifted responsibility for determining employment status from the worker to the hiring organisation. The effect has been to push many contractors off self-employment and onto PAYE, either directly or through umbrella companies. HMRC estimates that IR35 reforms have generated approximately &pound;2 billion in additional tax revenue, but the reforms have also created a compliance burden for hirers, reduced the availability of flexible talent, and driven some contractors into umbrella company arrangements where they lose the tax advantages of self-employment without gaining the employment rights of permanent workers. The Taylor Review of Modern Working Practices (2017) recommended a clearer statutory test for employment status and a new category of &ldquo;dependent contractor,&rdquo; but neither recommendation has been implemented.</p>
            <p>The gig economy represents the fastest-growing and most precarious segment of self-employment. An estimated 4.4 million people in the UK have performed gig economy work (Uber, Deliveroo, Amazon Flex, TaskRabbit, and similar platforms), though only about 1 million do so as their primary income source. The Supreme Court ruled in February 2021 that Uber drivers are workers (not self-employed), entitling them to the National Minimum Wage, holiday pay, and pension auto-enrolment &mdash; a landmark decision that in theory applies to all similar platforms. In practice, enforcement has been patchy and many platforms have restructured their arrangements to maintain the appearance of self-employment. Women comprise 33&percnt; of the self-employed, and ethnic minority workers are disproportionately represented in delivery and ride-hailing gig work. Age is a significant factor: workers aged 50+ make up 35&percnt; of the self-employed, and many entered self-employment involuntarily after redundancy, with limited pension savings and declining earning power. Rural self-employment is often in agriculture and trades, with different dynamics from urban gig and freelance work.</p>
            <p>Self-employment data is weaker than employment data. The Labour Force Survey &mdash; the primary source &mdash; relies on self-classification: workers who describe their main job as self-employed are counted as such, but the legal and tax definitions may differ. The LFS experienced a significant decline in response rates from 2020, and ONS has acknowledged that self-employment estimates are now less reliable than in previous years. Income data is particularly problematic: the LFS captures self-reported earnings that are known to understate actual income (some self-employed people report gross and others net, and the question wording does not clearly distinguish the two). HMRC Self Assessment data provides declared income for tax purposes but is subject to a two-year publication lag, excludes those below the registration threshold, and reflects tax planning as much as actual earnings. The gig economy is especially hard to measure: ONS does not have a standard definition of gig work, and surveys that attempt to quantify it use different methodologies and produce widely varying estimates (from 1.3 million to 7.3 million depending on the definition). There is no register of self-employed people in the UK, and the interaction between self-employment, PAYE employment, and benefit receipt (particularly Universal Credit) creates further data challenges.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-count', label: 'Self-Employed Count' },
          { id: 'sec-income', label: 'Income' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Self-employed workers"
              value="4.29M"
              direction="down"
              polarity="up-is-good"
              changeText="2024 &middot; Down from 4.93M peak in 2019 &middot; 700K left during COVID &middot; Most have not returned"
              sparklineData={[4.77, 4.80, 4.86, 4.85, 4.93, 4.31, 4.25, 4.24, 4.26, 4.29]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Median weekly earnings (self-employed)"
              value="&pound;310"
              direction="flat"
              polarity="up-is-good"
              changeText="2024 &middot; Employees: &pound;535/wk &middot; 42% earnings gap &middot; 1 in 3 below Living Wage hourly"
              sparklineData={[280, 275, 285, 290, 300, 256, 275, 290, 300, 310]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Self-employed with a pension"
              value="16%"
              direction="flat"
              polarity="up-is-good"
              changeText="2024 &middot; Employees: 79% &middot; Auto-enrolment does not apply &middot; Major retirement income risk"
              sparklineData={[14, 14, 15, 15, 15, 15, 16, 16]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-count" className="mb-12">
            <LineChart
              title="Self-employed workers, UK, 2015&ndash;2024"
              subtitle="Total number of people whose main job is self-employed (millions). The pandemic caused a structural collapse."
              series={countSeries}
              yLabel="Millions"
              annotations={countAnnotations}
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey — Self-Employment',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-income" className="mb-12">
            <LineChart
              title="Median weekly earnings, self-employed, UK, 2015&ndash;2024"
              subtitle="Self-reported median weekly income from self-employment (&pound;). Includes both full-time and part-time self-employed."
              series={incomeSeries}
              yLabel="£ per week"
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="Uber ruling"
            unit="Supreme Court 2021 — gig workers are workers with minimum wage and holiday rights"
            description="The Supreme Court&apos;s Uber v Aslam ruling (February 2021) established that gig economy drivers are workers, not self-employed contractors, entitling them to minimum wage, holiday pay, and pension auto-enrolment. The Employment Rights Bill proposes clearer employment status tests and stronger enforcement. The Self-Employed Income Support Scheme demonstrated that targeted support for the self-employed is feasible in a crisis. HMRC&apos;s Making Tax Digital programme is simplifying tax administration for 4.2 million self-employed. IPSE and the FSB continue to advocate for portable benefits and pension auto-enrolment for the self-employed."
            source="Source: ONS &mdash; Labour Force Survey 2024; HMRC &mdash; Self Assessment Statistics 2024; IPSE &mdash; Freelancer Confidence Index Q4 2024."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
