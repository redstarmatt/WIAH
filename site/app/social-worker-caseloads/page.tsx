'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface SocialWorkerData {
  national: {
    caseloads: {
      timeSeries: Array<{ year: number; avgCaseload: number }>;
      recommendedMax: number;
      latestYear: number;
      latestValue: number;
    };
    vacancyAndTurnover: {
      timeSeries: Array<{ year: number; vacancyRatePct: number; turnoverRatePct: number }>;
      latestVacancyPct: number;
      totalVacancies: number;
      agencyPct: number;
    };
    childProtectionPlans: {
      timeSeries: Array<{ year: number; count: number }>;
      latestCount: number;
      latestYear: number;
    };
    referrals: {
      annualCount: number;
      latestYear: number;
    };
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Component ────────────────────────────────────────────────────────────────

export default function SocialWorkerCaseloadsPage() {
  const [data, setData] = useState<SocialWorkerData | null>(null);

  useEffect(() => {
    fetch('/data/social-worker-caseloads/social_worker_caseloads.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const caseloadSeries: Series[] = data
    ? [{
        id: 'caseload',
        label: 'Average caseload per social worker',
        colour: '#E63946',
        data: data.national.caseloads.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.avgCaseload,
        })),
      }]
    : [];

  const caseloadAnnotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: MacAlister review published' },
  ];

  const vacancySeries: Series[] = data
    ? [
        {
          id: 'vacancy',
          label: 'Vacancy rate',
          colour: '#E63946',
          data: data.national.vacancyAndTurnover.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.vacancyRatePct,
          })),
        },
        {
          id: 'turnover',
          label: 'Turnover rate',
          colour: '#F4A261',
          data: data.national.vacancyAndTurnover.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.turnoverRatePct,
          })),
        },
      ]
    : [];

  const protectionPlanSeries: Series[] = data
    ? [{
        id: 'cpp',
        label: 'Children on child protection plans',
        colour: '#264653',
        data: data.national.childProtectionPlans.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const protectionAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: COVID-19 lockdown' },
  ];

  return (
    <>
      <TopicNav topic="Social Worker Caseloads" parentTopic="Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Worker Caseloads"
          question="Who's Protecting Vulnerable Children?"
          finding="The average children's social worker in England carries 18 cases — well above the recommended maximum of 12 to 15. With 6,600 vacancies, a 30% turnover rate in the worst-hit local authorities, and agency staff filling 17% of posts at two to three times the cost, the system protecting the country's most vulnerable children is chronically understaffed."
          colour="#E63946"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's children's social workers are the frontline of child protection — the professionals who investigate neglect, assess risk, and decide whether a child is safe at home. There are roughly 33,000 of them, and they are not enough. The average caseload has risen to 18 children per worker, against a recommended maximum of 12 to 15. In the most pressured local authorities, individual workers carry 25 or more cases simultaneously, each involving home visits, court reports, multi-agency meetings, and families in crisis. The human cost is measurable: 40 percent of newly qualified social workers leave the profession within five years. Annual turnover exceeds 30 percent in some authorities. The 6,600 vacancies across England are plugged by agency staff, who fill 17 percent of posts at two to three times the cost of permanent employees — money that could fund additional permanent roles. Every year, around 650,000 referrals reach children's services, and more than 50,000 children are subject to child protection plans at any given time.</p>
            <p>The consequences of this workforce crisis are not abstract. Serious case reviews following the deaths of Victoria Climbi&eacute;, Baby Peter, and Arthur Labinjo-Hughes each identified overloaded, under-supported social workers as a contributing factor. When a practitioner is managing twice the recommended caseload, the quality of assessment drops, warning signs are missed, and children fall through gaps in the system. The Independent Review of Children's Social Care, led by Josh MacAlister and published in 2022, called the situation unsustainable and recommended fundamental reform — including a national framework for caseload limits, investment in early help to reduce demand, and measures to end the reliance on expensive agency labour. Some progress has followed: regional social work academies have been established to improve training pipelines, and several local authorities have introduced retention bonuses. But the structural problem remains. Ofsted continues to rate some authorities &ldquo;inadequate&rdquo; for years running, and the emotional toll on practitioners — secondary trauma, burnout, and public blame after child deaths — drives an exit cycle that recruitment alone cannot fix.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-caseloads', label: 'Caseloads' },
          { id: 'sec-workforce', label: 'Workforce' },
          { id: 'sec-protection', label: 'Protection Plans' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Average caseload per social worker"
            value="18"
            direction="up"
            polarity="up-is-bad"
            changeText="2024 · Recommended max: 12–15 · Some LAs exceed 25 · Up from 15 in 2014"
            sparklineData={[15.2, 15.8, 16.1, 16.4, 16.9, 17.2, 16.8, 17.5, 17.8, 18.1, 18.0]}
            href="#sec-caseloads"
          />
          <MetricCard
            label="Vacancy rate"
            value="18.6%"
            direction="up"
            polarity="up-is-bad"
            changeText="2024 · 6,600 unfilled posts · Up from 14% in 2014 · Worst in London and South East"
            sparklineData={[14.2, 15.8, 16.4, 16.7, 16.0, 17.3, 16.9, 18.1, 19.4, 19.1, 18.6]}
            href="#sec-workforce"
          />
          <MetricCard
            label="Agency worker proportion"
            value="17%"
            direction="up"
            polarity="up-is-bad"
            changeText="2024 · Agency staff cost 2–3× permanent · Fill vacancies but reduce continuity · Some LAs above 30%"
            sparklineData={[11.0, 12.1, 13.4, 14.0, 14.8, 15.2, 14.6, 15.9, 16.8, 17.2, 17.0]}
            href="#sec-workforce"
          />
        </div>

        <ScrollReveal>
          <section id="sec-caseloads" className="mb-12">
            <LineChart
              title="Average caseload per children's social worker, England, 2014–2024"
              subtitle="Mean number of open cases per FTE social worker. Recommended maximum: 12–15 cases."
              series={caseloadSeries}
              yLabel="Cases per social worker"
              annotations={caseloadAnnotations}
              targetLine={{ value: 15, label: 'Recommended max (15)' }}
              source={{
                name: 'DfE',
                dataset: "Children's Social Work Workforce",
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-workforce" className="mb-12">
            <LineChart
              title="Vacancy and turnover rates for children's social workers, England, 2014–2024"
              subtitle="Vacancy rate (unfilled posts as % of establishment) and turnover rate (leavers as % of headcount)."
              series={vacancySeries}
              yLabel="% of workforce"
              source={{
                name: 'DfE',
                dataset: "Children's Social Work Workforce",
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-protection" className="mb-12">
            <LineChart
              title="Children subject to child protection plans, England, 2014–2024"
              subtitle="Number of children on a child protection plan at 31 March each year."
              series={protectionPlanSeries}
              yLabel="Children on protection plans"
              annotations={protectionAnnotations}
              source={{
                name: 'DfE',
                dataset: 'Characteristics of Children in Need',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="15%"
            unit="real-terms rise in starting salaries between 2022 and 2025"
            description="The National Assessment and Accreditation System raised entry standards for children's social workers, strengthening the professional baseline. Starting salaries rose 15% in real terms between 2022 and 2025, responding directly to recommendations from the MacAlister review. Several high-vacancy local authorities introduced retention bonuses of £3,000–£5,000 per year, and early evidence suggests these are stabilising turnover in the most affected areas. Regional social work academies — partnerships between universities and local authorities — have expanded training capacity and improved the quality of practice placements."
            source="Source: DfE — Children's Social Work Workforce 2024; Independent Review of Children's Social Care 2022."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
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
        <RelatedTopics />
      </main>
    </>
  );
}
